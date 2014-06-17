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
	distribution = std::uniform_int_distribution<int>(0, x - 1);
	blocks = new int[x];
	map = new int *[x];
	for (int i = 0; i < x; i++){
		map[i] = new int[y];
	}
	this->x = x;
	this->y = y;
	maximumGap = 3;
	minIx = 0;
	maxIx = 0;
}

int Game::NextBlock(){
	int loc = -1;
	do{
		loc = distribution(generator);
	} while ((blocks[loc] + 1) - blocks[minIx] > maximumGap);
	return loc;
}

void Game::SetBlock(int blockPosition){
	map[blockPosition][blocks[blockPosition]] = 1;
	blocks[blockPosition] += 1;
	FindMax(); FindMin();
}


int Game::RowToErase(){
	int row = -1;
	int val = 0;
	for (int j = 0; j < this->y; j++){
		val = 0;
		for (int i = 0; i < this->x; i++){
			val += map[i][j];
		}
		if (val == this->x){
			row = j;
			break;
		}
		else if (val == 0) break;
	}
	return row;
}

void Game::EraseRow(int row){
	int val = 0;
	for (int j = 0; j < this->y - 1; j++){
		val = 0;
		for (int i = 0; i < this->x; i++){
			map[i][j] = map[i][j + 1];
		}
	}
	for (int i = 0; i < this->x; i++){
		blocks[i] -= 1;
	}
}

int Game::GetRow(int position){
	return blocks[position] - 1;
}

void Game::Clear(){
	for (int i = 0; i < this->x; i++){
		blocks[i] = 0;
		for (int j = 0; j < y; j++){
			map[i][j] = 0;
		}
	}
}

void Game::FindMax(){
	for (int i = 0; i < this->x; i++){
		if (blocks[maxIx] < blocks[i]){
			maxIx = i;
		}
	}
}


void Game::FindMin(){
	for (int i = 0; i < this->x; i++){
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


void Game::Free(){
	free(blocks);
	free(map);
}
