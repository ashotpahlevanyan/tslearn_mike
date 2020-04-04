import {isPromise, wait} from './utils/promise';
/**
 * Given a generator function that yields one or more
 * promises, chain them together in sequence
 *
 * @param {any} genFn generator function that yields one or more promises
 * @return {undefined}
 */
export function task<T>(genFn: () => IterableIterator<any>): Promise<T> {
  let p = new Promise<T>((resolve) => {
    let it = genFn(); // Get the iterator
    // TODO: implement your solution here

    function nextStep(lastPromiseVal: any) {
      let itResult = it.next(lastPromiseVal);
      if(itResult.done) {
        console.log('done');
        return;
      } else {
        let { value } = itResult;
        if(isPromise(value)) {
          console.log('is a promise');
          value.then((promiseResult: any) => {
            nextStep(promiseResult);
          });
        } else {
          console.log('not a promise');
        }
      }
    }
    nextStep(undefined);
  });
  return p;
}

task(function*() {
  yield wait(600).then(() => {
    console.log('600 done');
  });
  yield wait(300).then(() => {
    console.log('300 done');
  });
});
