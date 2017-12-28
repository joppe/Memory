# Memory

I use this project to learn about Angular.

I used [this](https://coursetro.com/posts/code/84/Setting-up-an-Angular-4-MEAN-Stack-(Tutorial)) tutorial to learn how to mix express and Angular.

TODO

- debounce input
```
Observable
    .fromEvent(this.el.nativeElement, 'keyup')
    .map((event) => {
        return event.target.value;
    })
    .filter((text) => {
        return text.length > 1;
    })
    .debounceTime(250)
    .do(() => { // perform function but does not effect the stream
        this.loading.emit(true);
    })
    .map((query) => {
        this.youtube.search(query);
    })
    .switch() // ignore all event but the most recent
    .subscribe((results) => {
        // success
    }, () => {
        // error
    }, () => {
        // complete
    })

```
- routing
    - home
    - config/search
    - game
- structure
    - search
        - form
            - input
            - button
        - results
        - result
    - game
        - images
        - image
- state (redux)
    - loading
- localStorage
    - query
    - results
    - progress



## Goal 28-12

- basic routing
- restructuring search

