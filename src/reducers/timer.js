import {
    TIMER_START,
    TIMER_TICK,
    TIMER_STOP
} from "../actions/timer";

export default function timer(state = {}, action){
    switch (action.type) {
        case TIMER_START:
            return 20;
        case TIMER_STOP:
            return 0;
        case TIMER_TICK:
            return state - 1;
        default:
            return state;
    }
}