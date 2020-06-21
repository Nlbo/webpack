import Post from '@models/post';
import './styles/style';
import './styles/styleSass.scss';
import json from './assets/json';
import Image from './assets/erik.jpg';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import * as $ from 'jquery'
import './babel'

const x = '';

let post = new Post('WebPack Post Title', Image);

console.log('Post to String:', post.toString());

$('pre').addClass('code').html(post.toString());

console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);
