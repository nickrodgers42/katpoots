export const TIMER_START = "TIMER_START";
export const TIMER_TICK = "TIMER_TICK";
export const TIMER_STOP = "TIMER_STOP";

let timer = null;
export const start = () => dispatch => {
    dispatch({ type: TIMER_START });
    timer = setInterval(() => dispatch(tick()), 1000);
}

function tick(){
    return { type: TIMER_TICK };
}

export const stop = () => {
    clearInterval(timer);
    return { type: TIMER_STOP };
}