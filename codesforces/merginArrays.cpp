#include <iostream>
#include <vector>

using namespace std;

int main(void){

    int n, m;
    int k;
    int index = 0;
    int start1 = 0;
    int start2 = 0;
    vector<int> arr1;
    vector<int> arr2;
    vector<int> arr3;
    cin >> n >> m;
    k = m + n;
    int number;

    for (int i = 0; i < n; i++){

        cin >> number;
        arr1.push_back(number);
    }
    for (int i = 0; i < m; i++){

        cin >> number;
        arr2.push_back(number);
    }

    while (start1 < n || start2 < m){ // nbre iterations = n + m

        if (arr1[start1] < arr2[start2] && start1 < n || start2 == m){

            arr3.push_back(arr1[start1]);
            start1++;

        }
        else{
            arr3.push_back(arr2[start2]);
            start2++;
        }

        
    }
    
    for (int i = 0; i < m + n; i++){
        cout << (arr3[i] << arr2[i]) << " ";
    }
    

    return 0;
}