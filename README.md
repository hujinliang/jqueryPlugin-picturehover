
# picturehover



## Index

* [Quick start](#quick-start)
* [Options](#options)
* [Event](#event)
* [Demo](#demo)


## Quick start

include the files

```html
<script src="jquery.min.js"></script>
<script src="picturehover.min.js"></script>
```

call the the plugin on a container as your wish
```js
$("#container").picturehover();
```
or you can add the attr to the tag you want
```html
<div data-picturehover></div>
```

All done!



## Options


you can custom the caption by passing options when call the plugin.

call the the plugin on a container wish you wish
```js
$("#container").picturehover({
    height:'50%',
    duration:'fast',
    fontColor:'#fff',
    textAlign:'center',
    verticalMiddle: true,
    backgroundColor:'rgba(0,0,0,.9)',
    ...
});
```

## Event

There are two events ---'slideInEnd' and 'slideOutEnd',they are triggered when the overlay slidIn and the overlay slideOut,the argument--data is the index of the img of the container.
```js
$('#container').picturehover().on('slideInEnd',function(event,data){
      console.log('In-----'+data);

  }).on('slideOutEnd',function(event,data){
      console.log('Out----'+data);
  })
```


## Demo

There are 3 demos,you can learn how to use the simple plugin
* [demo](http://htmlpreview.github.io/?https://github.com/HUJINLIANG/jqueryPlugin-picturehover/blob/master/demo-basic.html)
