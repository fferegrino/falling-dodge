#include "pch.h"
#include "Game.h"
#include <random>
#include <chrono>
#include <algorithm>

using namespace FallingDodgeRT;
using namespace Platform;

Game::Game(int x, int y)
{
	unsigned seed = std::chrono::system_clock::now().time_since_epoch().count();
	generator = std::mt19937(seed);
	distribution = std::uniform_int_distribution<int>(0, x);
	blocks = new int[x+1];
	Game::x = x;
	Game::y = y;
	maximumGap = 3;
	minIx = 0;
	maxIx = 0;
	Clear();
}

int Game::NextBlock(){
	int loc = -1;
	do{
		loc = distribution(generator);
	} while ((blocks[loc] + 1) - blocks[minIx] > maximumGap);
	return loc;
}

void Game::SetBlock(int blockPosition){
	blocks[blockPosition] += 1;
	FindMax(); FindMin();
}

void Game::Clear(){
	for (int i = 0; i <= x; i++){
		blocks[i] = 0;
	}
}

void Game::FindMax(){
	for (int i = 0; i <= x; i++){
		if (blocks[maxIx] < blocks[i]){
			maxIx = i;
		}
	}
}


void Game::FindMin(){
	for (int i = 0; i <= x; i++){
		if (blocks[minIx] > blocks[i]){
			minIx = i;
		}
	}
}

int Game::Max(){
	return blocks[maxIx];
}

int Game::Min(){
	return blocks[minIx];
}
