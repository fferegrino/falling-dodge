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
		std::default_random_engine generator;
		std::uniform_int_distribution<int> distribution;

	};
}
