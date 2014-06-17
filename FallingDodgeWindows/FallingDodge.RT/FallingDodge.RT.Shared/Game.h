#pragma once
#include <random>

namespace FallingDodgeRT
{
	public ref class Game sealed
	{
	public:
		Game(int x, int y);
		void Free();
		int NextBlock();
		void SetBlock(int position);
		int RowToErase();
		void EraseRow(int row);
		void Clear();
		int Min();
		int Max();
		int GetRow(int position);
	private:
		void FindMin();
		void FindMax();
		//
		int x, y, maximumGap;
		int  minIx, maxIx;
		int * blocks;
		int ** map;
		std::mt19937 generator;
		std::uniform_int_distribution<int> distribution;

	};
}
