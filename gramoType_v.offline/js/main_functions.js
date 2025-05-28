// Оставь надежду, всяк сюда входящий

function firstAlign() {
  if (window.innerWidth < 1222) {
    current_mistakes_wrapper.classList.add('bottom');
  }
  if (window.innerWidth < 1408) {
    h_title.classList.add('up');
  }
  let cur_word = document.getElementsByClassName('current')[0];
  cur_scroller.style.marginLeft = `${cur_wrapper.clientWidth / 2 - (cur_word.clientWidth / 2)}px`;
  if (current_mistakes_wrapper.classList.contains('bottom')) {
    prev_wrapper.style.marginLeft = `${parseFloat(getComputedStyle(word_input).marginLeft) * 0.89}px`;
  } else {
    prev_wrapper.style.marginLeft = `${parseFloat(getComputedStyle(current_mistakes_wrapper).width) + 20}px`
  }
}

function generalAlign() {
  if (window.innerWidth < 1222) {
    if (!current_mistakes_wrapper.classList.contains('bottom')) {
      current_mistakes_wrapper.classList.add('bottom');
    }
  } else if (current_mistakes_wrapper.classList.contains('bottom')) {
    current_mistakes_wrapper.classList.remove('bottom');
  }

  if (window.innerWidth < 1408) {
    if (!h_title.classList.contains('up')) {
      h_title.classList.add('up');
    }
  } else if (h_title.classList.contains('up')) {
    h_title.classList.remove('up');
  }

  if (current_mistakes_wrapper.classList.contains('bottom')) {
    prev_wrapper.style.marginLeft = `${parseFloat(getComputedStyle(word_input).marginLeft) * 0.89}px`;
  } else {
    prev_wrapper.style.marginLeft = `${parseFloat(getComputedStyle(current_mistakes_wrapper).width) + 20}px`
  }

  if (w_index > 1) {
    let prev_w = prev_scroller.firstElementChild;
    let prev_width = parseFloat(getComputedStyle(prev_w).width);
    alignPrevScroller(prev_width);
  }

  cur_scroller.style.marginLeft = `${parseFloat(cur_scroller.style.marginLeft) + (window.innerWidth - last_window_width) / 2}px`;
  last_window_width = window.innerWidth;
}

function alignCurScroller(prev_width, new_width) {
  cur_scroller.style.marginLeft = `${parseFloat(cur_scroller.style.marginLeft) - new_width / 2 - prev_width / 2 + SPACE_WIDTH / 2 + ((loaded_words_amount > 29) ? parseFloat(getComputedStyle(cur_scroller.firstElementChild).width) : 0)}px`;
}

function alignPrevScroller(prev_width) {
  prev_scroller.style.marginLeft = `${(word_input.clientWidth / 2 - prev_width / 2) + (parseFloat(getComputedStyle(word_input).marginLeft) - parseFloat(prev_wrapper.style.marginLeft)) + SPACE_WIDTH}px`;
}

function correlateActiveButtons() {
  let list_number = 0;
  for (elem of wordlists_menu.children) {
    if (elem.tagName == 'BUTTON') {
      if (included_lists[list_number] == 1) {
        elem.classList.add('active');
      } else {
        elem.classList.remove('active');
      }
      list_number++;
    }
  }
}

function refreshInlcuded() {
  let list_number = 0;
  let selected_names = [];
  for (elem of wordlists_menu.children) {
    if (elem.tagName == 'BUTTON') {
      if (elem.classList.contains('active')) {
        included_lists[list_number] = 1;
        selected_names.push(elem.textContent);
      } else {
        included_lists[list_number] = 0;
      }
      list_number++;
    }
  }

  if (!(included_lists.includes(1))) {
    included_lists = [...prev_included_lists];
    correlateActiveButtons();
  }

  if (included_lists.toString() != prev_included_lists.toString()) {
    prev_included_lists = [...included_lists];
    wordlists_menu_button.textContent = selected_names.join(', ');
    startNew();
  } else {
    prev_included_lists = [...included_lists];
  }
}

function buildEndingScreen() {
  ending_mistakes.innerHTML = '';
  ending_title.innerHTML = wordlists_menu_button.textContent;
  for (mistake of mistakes_list) {
    ending_mistakes.innerHTML += `
          <div class="vertical_sep"></div>
          <div class="mistake">
            <div class="basic_word">${mistake[2]}</div>
            <div class="correct_answer">${mistake[0]}</div>
            <div class="incorrect_answer">${(mistake[1]) ? mistake[1] : '&nbsp;'}</div>
          </div>
    `;
  }
  ending_mistakes.innerHTML += `<div class="vertical_sep"></div>`;
  let accuracy = ((correct_count / words_amount) * 100).toFixed(1);
  let ending_accuracy = document.getElementById('ending_accuracy');
  if (accuracy < 15) ending_accuracy.style.color = '#960000';
  else if (accuracy < 30) ending_accuracy.style.color = '#c41704';
  else if (accuracy < 50) ending_accuracy.style.color = '#c44404';
  else if (accuracy < 75) ending_accuracy.style.color = '#c48e04';
  else if (accuracy < 80) ending_accuracy.style.color = '#c4ae04';
  else if (accuracy < 85) ending_accuracy.style.color = '#a4c404';
  else if (accuracy < 90) ending_accuracy.style.color = '#8ac404';
  else if (accuracy < 95) ending_accuracy.style.color = '#61c404';
  else if (accuracy < 100) ending_accuracy.style.color = '#13f007';
  else ending_accuracy.style.color = '#00fc9c';
  document.getElementById('ending_w_amount').textContent = words_amount;
  ending_accuracy.textContent = `${accuracy}%`;
  document.getElementById('ending_correct_counter').textContent = correct_count;
  document.getElementById('ending_incorrect_counter').textContent = incorrect_count;
}

function showEndingScreen() {
  ending_mistakes.scrollTop = 0;
  ending_screen.classList.remove('invisible');
  word_input.blur();
  global_scrollers_wrapper.classList.add('blurred');
  current_mistakes_wrapper.classList.add('blurred');
}

function hideEndingScreen() {
  ending_screen.classList.add('invisible');
  current_mistakes_wrapper.classList.remove('blurred');
  word_input.focus();
}

function pushCurrentMistake(mistake) {
  console.log(mistake);
  if (current_mistakes.childElementCount > 41) {
    current_mistakes.removeChild(current_mistakes.children[current_mistakes.childElementCount - 2])
  }
  current_mistakes.innerHTML = `
        <div class="mistake">
          <div class="vertical_sep"></div>
          <div class="basic_word">${mistake[2]}</div>
          <div class="correct_answer">${mistake[0]}</div>
          <div class="incorrect_answer">${(mistake[1]) ? mistake[1] : '&nbsp;'}</div>
        </div>
  ` + current_mistakes.innerHTML;
}

function eFormatted(text_value) {
  text_value = text_value.replaceAll("ё", "е");
  text_value = text_value.replaceAll("Ё", "Е");
  return text_value;
}

function sendValue(text_value, w_index) {
  word_input.value = '';
  let prev_w = cur_scroller.children[((loaded_words_amount > 29) ? 16 : w_index) - 1];

  if (w_index == words_amount) {
    if (eFormatted(text_value) == eFormatted(word_list[w_index - 1][1])) {
      main_correct_counter.innerHTML = ++correct_count;
    } else {
      main_incorrect_counter.innerHTML = ++incorrect_count;
      mistakes_list.push([word_list[w_index - 1][1], text_value, word_list[w_index - 1][0]]);
      pushCurrentMistake(mistakes_list[mistakes_list.length - 1]);
    }
    refreshed_after_ending = 0;
    buildEndingScreen();
    showEndingScreen();
    last_ending_button.classList.remove('invisible');
    return (0);
  }

  let new_w = cur_scroller.children[(loaded_words_amount > 29) ? 16 : w_index];
  let prev_width = parseFloat(getComputedStyle(prev_w).width);
  let new_width = parseFloat(getComputedStyle(new_w).width);

  prev_w.innerHTML = prev_w.innerHTML.substring(19, prev_w.innerHTML.length); // i know, i know
  prev_w.classList.remove('current');

  prev_scroller.innerHTML = `<span class='word last passed'>${word_list[w_index - 1][1]}<span>  </span></span>` + prev_scroller.innerHTML;
  if (eFormatted(text_value) == eFormatted(word_list[w_index - 1][1])) {
    prev_w.classList.add('correct');
    prev_scroller.firstElementChild.classList.add('correct');
    main_correct_counter.innerHTML = ++correct_count;
  } else {
    prev_w.classList.add('incorrect');
    prev_scroller.firstElementChild.classList.add('incorrect');
    main_incorrect_counter.innerHTML = ++incorrect_count;
    mistakes_list.push([word_list[w_index - 1][1], text_value, word_list[w_index - 1][0]]);
    pushCurrentMistake(mistakes_list[mistakes_list.length - 1]);
  }
  new_w.innerHTML = new_w.innerHTML + `<span> </span>`;
  new_w.classList.add('current');

  alignCurScroller(prev_width, new_width);
  let prev_scroller_ch = prev_scroller.children;
  if (prev_scroller_ch.length > 1) {
    prev_scroller_ch[1].classList.remove('last');
    prev_scroller_ch[1].firstElementChild.outerHTML = `<span> </span>`;
  }
  all_counter.innerHTML = w_index;
  alignPrevScroller(prev_scroller_ch[0].clientWidth);

  if (loaded_words_amount > 29) {
    unloadOneWord();
  }

  if (loaded_words_amount < words_amount) {
    let pair_to_push;
    if (select_mode_nd.classList.contains('active')) {
      pair_to_push = words[loaded_words_amount % words.length];
    } else {
      pair_to_push = words[Math.floor(Math.random() * words.length)];
    }
    loadOneWord(pair_to_push);
  }
}

function hideWordlistsMenu() {
  refreshInlcuded();
  wordlists_menu.classList.add('invisible');
  wordlists_menu_button.classList.remove('active');
  word_input.focus();
}

function shuffleList(words) {
  for (let i = words.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words;
}

function fillScroller() {
  words = [];
  for (let i = 0; i < wordlists.length; i++) {
    if (included_lists[i]) {
      words.push(...wordlists[i])
    }
  }

  if (select_mode_fl.classList.contains('active')) {
    words_amount = words.length;
  }

  word_list = [];
  correct_count = 0;
  incorrect_count = 0
  word_input.value = '';
  cur_scroller.innerHTML = '';
  prev_scroller.innerHTML = '';
  mistakes_list = [];
  loaded_words_amount = 0;

  // pair_to_push[0] = pair_to_push[0].replace(/ /g, ' ');
  amount_to_load = (words_amount < 14) ? words_amount : 15;
  if (select_mode_nd.classList.contains('active')) {
    words = shuffleList(words);
    for (let i = 0; i < amount_to_load; i++) {
      let pair_to_push = words[i % words.length];
      loadOneWord(pair_to_push);
    }
  } else {
    for (let i = 0; i < amount_to_load; i++) {
      let pair_to_push = words[Math.floor(Math.random() * words.length)];
      loadOneWord(pair_to_push);
    }
  }

  all_counter.innerHTML = 0;
  main_w_amount.innerHTML = words_amount;
  main_correct_counter.innerHTML = 0;
  main_incorrect_counter.innerHTML = 0;
}

function loadOneWord(pair_to_push) {
  word_list.push(pair_to_push);
  if (!pair_to_push[0].match(/\s/)) {
    if (loaded_words_amount) {
      cur_scroller.innerHTML += `<span class='word'><span> </span>${word_list[loaded_words_amount][0]}</span>`;
    } else {
      cur_scroller.innerHTML += `<span class='word current'><span> </span>${word_list[0][0]}<span> </span></span>`;
    }
  } else {
    let temp_words = pair_to_push[0].match(/\S+/g);
    temp_words = temp_words.join(`<span class='space'> </span>`);
    if (loaded_words_amount) {
      cur_scroller.innerHTML += `<span class='word'><span> </span>${temp_words}</span>`;
    } else {
      cur_scroller.innerHTML += `<span class='word current'><span> </span>${temp_words}<span> </span></span>`;
    }
  }
  loaded_words_amount++;
}

function unloadOneWord() {
  cur_scroller.firstElementChild.remove();
  prev_scroller.lastElementChild.remove();
}

function startNew() {
  fillScroller();
  firstAlign();
  w_index = 1;
}

fillScroller();
