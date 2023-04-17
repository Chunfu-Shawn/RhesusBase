import numpy as np
import pandas as pd
import sys
import re

predictive_index_array = np.array([
    [[-0.4, -0.3, 0, -0.2],
    [1, 2.7, 0, 2.3],
    [1.2, 1.6, 0, 1],
    [1.6, 4.4, 0, 2.2],
    [2.6, 4.7, 0, 1.9],
    [2.9, 2.7, 0, 2.6],
    [1.8, 0.6, 0, 0.3],
    [1.7, 2.3, 0, 1.3],
    [5.6, 6, 0, 3.7],
    [4.8, 6.1, 0, 2.8],
    [2.8, 3.8, 0, 3.3],
    [0.6, 5.5, 0, 5.2],
    [0.6, 4, 0, 1],
    [5.5, 6.8, 0, 4.1],
    [4.6, 5, 0, 0.5],
    [4.5, 3.7, 0, 3.4],
    [2.1, 3.6, 0, 0.7],
    [0.5, 0.7, 0, 0.4],
    [0.5, 0.5, 0, 0.5],
    [0, 0, 0, 0],
    [0, 0, 0, 0]], # A in siRNA

    [[-0.2, -0.2, -0.1, 0],
    [1.7, 1.7, 1.2, 0],
    [3.3, 2.5, 1.4, 0],
    [3.8, 4.7, 1.1, 0],
    [2.3, 2.1, 0.7, 0],
    [0.7, 1, 3.1, 0],
    [1.7, 2.5, 0.3, 0],
    [4.4, 3.5, 2.4, 0],
    [3.2, 1.8, -0.1, 0],
    [6.9, 8, 4.7, 0],
    [6.5, 6.1, 7.6, 0],
    [1, 4.1, 3.4, 0],
    [2.5, 4, 3.4, 0],
    [0.7, 0.5, 0.7, 0],
    [0.3, 0.4, 0, 0],
    [1.8, 1.5, 1.1, 0],
    [0.3, 0.9, 0.1, 0],
    [0.7, 1, 0.4, 0],
    [0.5, 0.5, 0.5, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]], # G in siRNA

    [[0, 0.4, 0, 0.5],
    [0, 0.7, 0.3, 0.5],
    [0, 1.5, 1.4, 4.1],
    [0, 2.9, 1.5, 3.5],
    [0, 2.4, 0.9, 2.3],
    [0, 1.1, 1.5, 2.2],
    [0, 1.8, 0.5, 2.6],
    [0, 0.8, 2.2, 2.9],
    [0, 2.4, 7.1, 7],
    [0, 1.1, 0.1, 1.3],
    [0, 3.1, 5.3, 4.6],
    [0, 2.8, 8.1, 8.4],
    [0, 10.6, 7.5, 7.5],
    [0, 1.1, 0.4, 3.4],
    [0, 5.4, 4.2, 4],
    [0, 4.7, 3.2, 4.7],
    [0, 3.4, 1, 2.3],
    [0, 0.8, 0.7, 1.1],
    [0, 0.5, 0.5, 0.5],
    [0, 0, 0, 0],
    [0, 0, 0, 0]], # U in siRNA

    [[0, 0, 0.1, 0.4],
    [0.1, 0, 0.2, 0.3],
    [1.1, 0, 1.5, 1.6],
    [1.6, 0, 1.9, 4],
    [0.2, 0, 0.6, 0.5],
    [-0.1, 0, 2, 2.3],
    [0.6, 0, 0.6, 1.3],
    [2.3, 0, 2.9, 3.3],
    [1.6, 0, 3.3, 5.1],
    [4.3, 0, 4.8, 6.4],
    [1.8, 0, 4.1, 3.1],
    [1.9, 0, 5.4, 8.6],
    [1.6, 0, 4.6, 5],
    [0.5, 0, 1, 1.6],
    [0.4, 0, 1.1, 4.9],
    [2.9, 0, 4.8, 7.4],
    [1, 0, 1.9, 3.5],
    [0.5, 0, 0.4, 0.9],
    [0.5, 0, 0.5, 0.5],
    [0, 0, 0, 0],
    [0, 0, 0, 0]] # C in siRNA
])


def base_index(base):
    if base == 'A':
        index = 0
    elif base == "G":
        index = 1
    elif base == "U":
        index = 2
    elif base == "C":
        index = 3
    elif base == "T":
        index = 2
    return index


class Alignment:
    def __init__(self, s1_id, s1, s2_id, s2):
        self.seq1_name = s1_id
        self.seq1_seq = s1
        self.seq2_name = s2_id
        self.seq2_seq = s2
        self.num_gap = 0
        self.target_start = 0
        self.target_end = 0
        self.target_seq = ''
        self.mismatch_type = ''
        self.mismatch = ''
        self.predictive_index = 0

    def revise_mismatch_type(self):
        if self.mismatch == '' and self.num_gap != 0:
            self.mismatch_type = "All-match_gapped"


def remove_special_characters(string):
    string = re.sub(r'[^a-zA-Z]+', '', string)
    return string


def opt_solution(G, s1, s2):
    score = -sys.float_info.max
    max_score = -sys.float_info.max
    rows = len(s1) + 1
    cols = len(s2) + 1
    start = rows - 1

    for i in range(rows-1, -1,-1):
        temp_score = G[i][cols-1]
        if temp_score > score:
            score = temp_score
            max_score = score
            start = i  # backtrace from cell G[i,cols-1]
    return max_score, start


def dp_algorithm(s1, s2, match_score=5, mismatch_score=-4, gap_open=-5, gap_extend=-1):
    # initialize the DP matrix with zeros
    rows = len(s1) + 1
    cols = len(s2) + 1
    G = [[0 for _ in range(cols)] for _ in range(rows)]
    H = [[0 for _ in range(cols)] for _ in range(rows)]

    # fill in the first row and first column of the matrix with gap penalties
    for i in range(1, rows):
        G[i][0] = 0
        H[i][0] = 1
    for j in range(1, cols):
        G[0][j] = 0
        H[0][j] = 2

    # fill in the rest of the DP matrix
    for i in range(1, rows):
        for j in range(1, cols):

            match = G[i-1][j-1] + (match_score if s1[i-1] == s2[j-1] else mismatch_score)

            if H[i-1][j] == 0 or H[i-1][j] == 2:
                delete = G[i-1][j] + gap_open
            elif H[i-1][j] == 1:
                delete = G[i - 1][j] + gap_extend

            if H[i][j-1] == 0 or H[i][j-1] == 1:
                insert = G[i][j-1] + gap_open
            elif H[i][j-1] == 2:
                insert = G[i][j - 1] + gap_extend

            G[i][j] = max(match, delete, insert)
            H[i][j] = np.argmax([match, delete, insert])
    #print(pd.DataFrame(G),pd.DataFrame(H))

    return G, H


def backtracing(H, s2, start):

    cols = len(s2) + 1
    where = []
    i, j = start, cols-1
    jb = None

    while j >= 0:
        if j == 0 and jb == 0:
            break

        where.append([i, j])

        jb = j

        if H[i][j] == 0:
            i -= 1; j -= 1
        elif H[i][j] == 1:
            i -=1
        elif H[i][j] == 2:
            j -=1

    where.reverse()

    return where


def count_consecutive_elements(lst):
    stack = []  # initialize an empty stack
    count = 0  # initialize count to 0
    extend = 0

    for elem in lst:
        if not stack or elem != stack[-1]:
            # if stack is empty or current element is not equal to the top element
            # push current element onto stack and reset count to 1
            stack.append(elem)
            extend = 0
        else:
            # if current element is equal to the top element
            # increment count and update top element in stack
            if not extend:
                count += 1
                extend = 1
    return count


def count_gap(where):
    s1 = [row[0] for row in where]  # First column
    s2 = [row[1] for row in where]  # Second column
    count = count_consecutive_elements(s1) + count_consecutive_elements(s2)
    return count


def get_mis_pred(s1, s2, where):
    stack = []
    mis = ''
    mis_pattern = 'AS,'
    predictive_index = 0
    enter = 0

    for item in where:
        if item[0] == 0 or item[1] == 0:
            continue
        if not stack or (item[0] != stack[-1][0] and item[1] != stack[-1][1]):
            enter = 1
            # Solve mismatch
            if s1[item[0]-1] != s2[item[1]-1]:
                mis_pattern += str(item[1]) + ','
                mis += '_'.join([str(item[1]), s2[item[1]-1], str(item[0]), s1[item[0]-1]]) + ','
            # Solve predictive_index
            try:
                s2_idx = base_index(s2[item[1]-1])
                s1_idx = base_index(s1[item[0]-1])
                pos = item[1] - 1
                predictive_index += predictive_index_array[s2_idx][pos][s1_idx]
            except IndexError:
                raise IndexError("It seems your input siRNA sequence is longer than 21 bp!")

        stack.append(item)
    if mis_pattern == 'AS,': mis_pattern = 'All-match'
    if not enter: predictive_index = 'N.A.'
    return mis_pattern, mis, predictive_index


def get_target_seq(s1,where):
    for item in where:
        if item[0] == 0 or item[1] == 0:
            continue
        else:
            start = item[0]
            break
    end = where[-1][0]
    seq = s1[(start-1):end]
    return start, end, seq