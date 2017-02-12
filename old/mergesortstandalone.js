'use strict';

function mergeSort(array) {
  let final = mergeSortRec(array);

  function mergeSortRec(array) {
    let length = array.length;
    if (length === 1) return array;

    let mid = Math.floor(length/2);
    let left = array.slice(0, mid);
    let right = array.slice(mid, length);

    return merge(mergeSortRec(left), mergeSortRec(right));
  }

  function merge(left, right) {
    let result = [];
    let il = 0;
    let ir = 0;

    while (il < left.length && ir < right.length) {
      //here's where we sort;
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }

    //these blocks handle any singletons left over;
    while (il < left.length) {
      result.push(left[il++]);
    }
    while (ir < right.length) {
      result.push(right[ir++]);
    }

    return result;
  }

  return final;
}

function quickSort(array) {

  return quick(array, 0, array.length-1);

  function quick(array, left, right) {
    let index = 0;

    if (left < index-1) {
      quick(array, left, index-1);
    }
    if (index < right) {
      quick(array, left, right);
    }
  }

  function partition(array, left, right) {
    let pivot = array[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (array[i] < pivot) {
        
      }
    }
  }
}

let array = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

console.log(mergeSort(array));
