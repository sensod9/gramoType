const h_title = document.getElementById('h_title');

const wordlists_menu_button = document.getElementById('wordlists_menu_button');
const toggle_list1 = document.getElementById('toggle_list1');
const toggle_list2 = document.getElementById('toggle_list2');
const toggle_list3 = document.getElementById('toggle_list3');
const toggle_list4 = document.getElementById('toggle_list4');
const toggle_list5 = document.getElementById('toggle_list5');

const select_mode_nd = document.getElementById('select_mode_nd');
const select_mode_fl = document.getElementById('select_mode_fl');
const select_amount_10 = document.getElementById('select_amount_10');
const select_amount_25 = document.getElementById('select_amount_25');
const select_amount_50 = document.getElementById('select_amount_50');
const select_amount_100 = document.getElementById('select_amount_100');
const select_amount_custom = document.getElementById('select_amount_custom');
const words_amount_input = document.getElementById('words_amount_input');
const custom_amount_button = document.getElementById('custom_amount_button');


const wordlists_menu = document.getElementById('wordlists_menu');

const ending_screen = document.getElementById('ending_screen');
const ending_crossmark = document.getElementById('ending_crossmark');
const ending_mistakes = document.getElementById('ending_mistakes');
const ending_title = document.getElementById('ending_title');

const last_ending_button = document.getElementById('last_ending_button');

const global_scrollers_wrapper = document.getElementById('global_scrollers_wrapper');
const word_input = document.getElementById('word_input');
const all_counter = document.getElementById('all_counter');
const main_w_amount = document.getElementById('main_w_amount');
const main_correct_counter = document.getElementById('main_correct_counter');
const main_incorrect_counter = document.getElementById('main_incorrect_counter');
const cur_scroller = document.querySelector('.word_scroller.cur');
const cur_wrapper = document.querySelector('.scroller_wrapper.cur');
const prev_scroller = document.querySelector('.word_scroller.prev');
const prev_wrapper = document.querySelector('.scroller_wrapper.prev');
const w_counter = document.querySelector('.words_counter');
const current_mistakes_wrapper = document.getElementById('current_mistakes_wrapper');
const current_mistakes = document.getElementById('current_mistakes');

var w_index = 1;
var correct_count = 0;
var incorrect_count = 0;
var words_amount = 25;
var loaded_words_amount = 0;

var prev_included_lists = [1, 0, 0, 0, 0];
var included_lists = [1, 0, 0, 0, 0];
var word_list = [];
var mistakes_list = [];
var refreshed_after_ending = 1;

var select_amount_active = select_amount_25;

const SPACE_WIDTH = 26.4;

const first_window_width = window.innerWidth;
var last_window_width = window.innerWidth;

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
