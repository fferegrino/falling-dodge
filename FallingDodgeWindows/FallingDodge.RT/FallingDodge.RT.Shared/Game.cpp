#include "pch.h"
#include "Game.h"
#include <random>
#include <chrono>

using namespace FallingDodgeRT;
using namespace Platform;

Game::Game(int x, int y)
{// obtain a seed from the system clock:
	unsigned seed1 = std::chrono::system_clock::now().time_since_epoch().count();
	generator = std::mt19937(seed1);
	distribution = std::uniform_int_distribution<int>(0, x);
}

int Game::Aleatorio(){
	return distribution(generator);
}
