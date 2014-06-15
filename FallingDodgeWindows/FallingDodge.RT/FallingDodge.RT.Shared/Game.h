#pragma once
#include <random>

namespace FallingDodgeRT
{
	public ref class Game sealed
	{
	public:
		Game(int x, int y);
		int NextBlock();
		void SetBlock(int position);
		void Clear();
		int Min();
		int Max();
	private:
		void FindMin();
		void FindMax();
		//
		int x, y, maximumGap;
		int  minIx, maxIx;
		int * blocks;
		std::mt19937 generator;
		std::uniform_int_distribution<int> distribution;

	};
}
