const lyrics = document.querySelectorAll('.lyric');

const revealLyrics = () => {
  const trigger = window.innerHeight * 0.85;

  lyrics.forEach(line => {
    if (line.getBoundingClientRect().top < trigger) {
      line.classList.add('show');
    }
  });
};

window.addEventListener('scroll', revealLyrics);
revealLyrics();
