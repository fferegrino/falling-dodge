#pragma once
#include <random>

namespace FallingDodgeRT
{
	public ref class Game sealed
	{
	public:
		Game(int x, int y);
		int Aleatorio();
	private:
		int x, y;
		std::mt19937 generator;
		std::uniform_int_distribution<int> distribution;

	};
}
