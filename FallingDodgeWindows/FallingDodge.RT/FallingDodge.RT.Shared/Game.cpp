#include "pch.h"
#include "Game.h"
#include <random>

using namespace FallingDodgeRT;
using namespace Platform;

Game::Game(int x, int y)
{
	distribution = std::uniform_int_distribution<int>(0, x);
}

int Game::Aleatorio(){
	return distribution(generator);
}
