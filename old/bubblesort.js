'use strict';

function ArrayList() {

  let array = [];

  this.insert = function(item) {
    array.push(item);
  };

  this.toString = function() {
    return array.join();
  };

  let swap = function(array, index1, index2) {
    let aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
  };

  this.bubbleSort = function() {
    let length = array.length;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length-1; j++) {
        if(array[j] > array[j+1]) {
          swap(array, j, j+1);
        }
      }
    }
  };

  this.improvedBubbleSort = function() {
    let length = array.length;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length-1-i; j++) {
        if(array[j] > array[j+1]) {
          swap(array, j, j+1);
        }
      }
    }
  };

  this.selectionSort = function() {
    let length = array.length;
    let indexMin = null;

    for (var i = 0; i < length-1; i++) {
      indexMin = i;
      for (var j = i; j < length; j++) {
        if(array[indexMin] > array[j]) {
          indexMin = j;
        }
      }
      if(i !== indexMin) {
        swap(array, i, indexMin);
      }
    }
  };

  this.insertionSort = function() {
    let length = array.length;
    let j = null;
    let temp = null;

    for (var i = 1; i < length; i++) {
      j = i;
      temp = array[i];
      while (j > 0 && array[j-1] > temp) {
        array[j] = array[j-1];
        j--;
      }
      array[j] = temp;
    }
  };

  this.mergeSort = function() {
    array = mergeSortRec(array);
  };

  let mergeSortRec = function(array) {
    let length = array.length;
    if (length === 1) {
      console.log('array ', array);
      return array;
    }
    var mid = Math.floor(length / 2);
    var left = array.slice(0, mid);
    var right = array.slice(mid, length);

    // console.log('left ', left);
    // console.log('right ', right);

    return merge(mergeSortRec(left), mergeSortRec(right));
  };

  let merge = function(left, right) {
    var result = [];
    var il = 0;
    var ir = 0;

    // console.log('left ', left);
    // console.log('right ', right);

    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }

    while (il < left.length) {
      result.push(left[il++]);
    }

    while (ir < right.length) {
      result.push(right[ir++]);
    }

    return result;
  };

  this.quickSort = function() {
    quick(array, 0, array.length-1);
  };

  let quick = function(array, left, right) {
    let index = null;

    if (array.length > 1) {
      index = partition(array, left, right);

      if (left < index-1) {
        quick(array, left, index-1);
      }
      if (index < right) {
        quick(array, index, right);
      }
    }
  };

  let partition = function(array, left, right) {
    let pivot = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (array[i] < pivot) {
        i++;
      }
      while (array[j] > pivot) {
        j--;
      }
      if (i <= j) {
        swap(array, i, j);
        i++;
        j--;
      }
    }
    return i;
  };

}

function createNonSortedArray(size) {
  let array = new ArrayList();
  for (var i = size; i > 0; i--) {
    array.insert(i);
  }
  return array;
}

let array = createNonSortedArray(10);
console.log(array.toString());

array.mergeSort();
console.log(array.toString());
