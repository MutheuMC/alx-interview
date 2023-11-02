import sys

def is_safe(board, row, col, n):
    # Check the left side of the current row
    for i in range(col):
        if board[row][i] == 1:
            return False

    # Check upper-left diagonal
    for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
        if board[i][j] == 1:
            return False

    # Check lower-left diagonal
    for i, j in zip(range(row, n, 1), range(col, -1, -1)):
        if board[i][j] == 1:
            return False

    return True

def solve_nqueens(n):
    if n < 4:
        print("N must be at least 4")
        sys.exit(1)

    board = [[0] * n for _ in range(n)]
    solutions = []
    
    def solve(row):
        if row == n:
            solution = [''.join(['Q' if x == 1 else '.' for x in row]) for row in board]
            solutions.append(solution)
            return

        for col in range(n):
            if is_safe(board, row, col, n):
                board[row][col] = 1
                solve(row + 1)
                board[row][col] = 0

    solve(0)
    
    for solution in solutions:
        for row in solution:
            print(row)
        print()

if len(sys.argv) != 2:
    print("Usage: nqueens N")
    sys.exit(1)

try:
    N = int(sys.argv[1])
except ValueError:
    print("N must be a number")
    sys.exit(1)

solve_nqueens(N)
