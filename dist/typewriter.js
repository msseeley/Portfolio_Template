
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIdx = 0;
    this.wait = parseInt(wait);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIdx % this.words.length;
    const word = this.words[current];

    this.txt = this.isDeleting ?
      word.substring(0, this.txt.length - 1) :
      this.txt = word.substring(0, this.txt.length + 1);

    // insert the txt into the element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 200
    if (this.isDeleting) typeSpeed /= 2;
    if (!this.isDeleting && this.txt === word) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    }
    else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIdx++;
      typeSpeed = 200;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}



// Initialize when the DOM loads
document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  const typing = new TypeWriter(txtElement, words, wait);
}

