window.onload = function() {
  firstAlign();
  word_input.focus();
  word_input.value = '';
  words_amount_input.value = '';
};

window.onkeydown = (event) => {
  if (event.key == 'Tab' || event.key == 'Escape') {
    event.preventDefault();
    if (!ending_screen.classList.contains('invisible')) {
      hideEndingScreen();
      startNew();
      refreshed_after_ending = 1;
    }
    else if (!wordlists_menu.classList.contains('invisible')) {
      wordlists_menu.classList.add('invisible');
      wordlists_menu_button.classList.remove('active');
      correlateActiveButtons();
      word_input.focus();
    }
    else if (document.activeElement == word_input) {
      startNew();
    } else {
      words_amount_input.classList.add('invisible');
      custom_amount_button.classList.remove('invisible');
      words_amount_input.value = '';
      word_input.focus();
    }
  }
};

document.addEventListener('mousedown', function(event) {
  event.preventDefault();
  if (ending_screen.classList.contains('invisible')) {
    if (event.target != words_amount_input) {
      words_amount_input.classList.add('invisible');
      custom_amount_button.classList.remove('invisible');
      words_amount_input.value = '';
      if (wordlists_menu_button.contains(event.target)) {
        wordlists_menu_button.classList.toggle('active');
        if (wordlists_menu.classList.contains('invisible')) {
          wordlists_menu.classList.remove('invisible');
          word_input.blur();
          return (0);
        } else {
          hideWordlistsMenu();
        }
      } else if ((!wordlists_menu.contains(event.target)) && (!wordlists_menu.classList.contains('invisible'))) {
        hideWordlistsMenu();
      } else if (wordlists_menu.contains(event.target)) return (0);
    }
    word_input.focus();

  } else {
    if (ending_crossmark.contains(event.target) || !ending_screen.contains(event.target)) {
      if (!refreshed_after_ending) {
        startNew();
        refreshed_after_ending = 1;
      }

      hideEndingScreen();
    }
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key == 'Enter' || event.key == ' ') {
    event.preventDefault();
    if (!wordlists_menu.classList.contains('invisible')) {
      hideWordlistsMenu();
      return (0);
    }
    if (ending_screen.classList.contains('invisible')) {
      if (document.activeElement == word_input) {
        if (!event.repeat) {
          sendValue(word_input.value, w_index++);
        }
      } else {
        words_amount_input.classList.add('invisible');
        custom_amount_button.classList.remove('invisible');
        if (words_amount_input.value != 0) {
          select_amount_active.classList.remove('active');
          select_amount_active = select_amount_custom;
          select_amount_active.classList.add('active');
          words_amount = words_amount_input.value;
          words_amount_input.value = '';
          startNew();
        } else {
          words_amount_input.value = '';
        }
        word_input.focus();
      }
    }
  } else if (document.activeElement != word_input) {
    if (!(event.key in NUMBERS) && (!(event.key == 'Backspace')))
      event.preventDefault(); // впредь не ставлю фигурные скобки если однострочный иф блок. пох на рекомендованный стайл
  }
});

wordlists_menu.onclick = (event) => {
  toggle_button = event.target;
  if (toggle_button.tagName == 'BUTTON') { // почему оно именно капсом?
    toggle_button.classList.toggle('active');
  }
}

select_mode_nd.onclick = () => {
  if (!select_mode_fl.classList.contains('active')) {
    select_mode_nd.classList.toggle('active')
    startNew();
  }
}

select_mode_fl.onclick = () => {
  if (!select_mode_fl.classList.contains('active')) {
    select_mode_nd.classList.add('active')
  }
  select_amount_active.classList.remove('active');
  select_amount_active = select_mode_fl;
  select_amount_active.classList.add('active');
  startNew();
}

select_amount_10.onclick = () => {
  words_amount = 10;
  select_amount_active.classList.remove('active');
  select_amount_active = select_amount_10;
  select_amount_active.classList.add('active');
  startNew();
};

select_amount_25.onclick = () => {
  words_amount = 25;
  select_amount_active.classList.remove('active');
  select_amount_active = select_amount_25;
  select_amount_active.classList.add('active');
  startNew();
};

select_amount_50.onclick = () => {
  words_amount = 50;
  select_amount_active.classList.remove('active');
  select_amount_active = select_amount_50;
  select_amount_active.classList.add('active');
  startNew();
};

select_amount_100.onclick = () => {
  words_amount = 100;
  select_amount_active.classList.remove('active');
  select_amount_active = select_amount_100;
  select_amount_active.classList.add('active');
  startNew();
};

select_amount_custom.onclick = () => {
  custom_amount_button.classList.add('invisible');
  words_amount_input.classList.remove('invisible');
  words_amount_input.focus();
};

word_input.onfocus = () => {
  global_scrollers_wrapper.classList.remove('blurred');
};

window.onresize = () => {
  generalAlign();
};

last_ending_button.onclick = () => {
  showEndingScreen();
}
