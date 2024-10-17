import data from '../data/words.json' with { type: 'json' };

const filterMessage = (msg) => {
    const bad = data.words.filter((bd) => msg.toLowerCase().includes(bd));

    return bad.length;
};

const redirectBadUser = () => {
    // user wrote a bad word, make them spin =)
    // new Audio('../assets/terminator.mp3').play();
    // TODO: find a way to close their window
    // window.open('', '_self').close();
    // window.close();
    window.location.href = 'https://www.youtube.com/watch?v=LRxaXmXvjnU';
};

export { filterMessage, redirectBadUser };
