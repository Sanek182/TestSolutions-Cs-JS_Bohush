// See https://aka.ms/new-console-template for more information
using System;
using System.Collections.Generic;
using System.Security.Cryptography;


class Program {
    public static (int Item1, string Item2) MinSonicMeets(int[] arr, int targetIndex) {

        int nonZeroSonic = 0;
        // condition - each group can't have negative number of hedgehogs or more than the max possible integer
        int min = int.MaxValue;
        int max = -1;

        foreach (var i in arr) {
            if (i > 0) {
                nonZeroSonic++; // count how many Sonic groups are not desolate
            }
        }
        //Console.WriteLine(nonZeroSonic);

        string targetColor = targetIndex switch
        {
            0 => "red",
            1 => "green",
            _ => "blue",
        };

        if (targetIndex < 0 || targetIndex >= arr.Length) {
            return (-1, "(!color is set improperly)"); // the desired color is set with only three indexes
        };

        List<int> helpList = new(arr);
        helpList.RemoveAt(targetIndex); // exclude group of given color out of array
        int[] workingArr = [.. helpList]; // their quantity does not influence the solution

        // find the smaller and bigger Sonic group for later use
        min = Math.Min(min, Math.Min(workingArr[0], workingArr[1]));
        max = Math.Max(max, Math.Max(workingArr[0], workingArr[1]));

        // check if the two groups of Sonics are able to plan meetings - 
        // their difference should be divisible by three without a remainder
        if (arr.Length == 3 && ((max - min) % 3 == 0) && nonZeroSonic > 1) {
            return (max,targetColor);
        } else {
            return (-1, targetColor);
        }
    }

    static void Main(string[] args) {
        int[] arr = [8, 1, 9];
        dynamic sonics = MinSonicMeets(arr, 0);
        Console.WriteLine($"The minimum number of meetings needed to make all Sonics {sonics.Item2} is: {sonics.Item1}");
    }
}
