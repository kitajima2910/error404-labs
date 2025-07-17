// import { createStore } from "https://cdn.skypack.dev/redux";

//////////////// MY REDUX ////////////////////
const createStore = (reducer) => {
    let state = reducer(undefined, {});
    const subscribers = [];

    return {
        getState: () => {
            return state;
        },
        dispatch: (action) => {
            state = reducer(state, action);

            subscribers.forEach((subscriber) => {
                subscriber();
            });
        },
        subscribe: (subscriber) => {
            subscribers.push(subscriber);
        },
    };
};

//////////////// MY APP ////////////////////
const initState = 0;

// reducer
const ATM = (state = initState, action) => {
    switch (action.type) {
        case "DEPOSIT":
            return state + action.payload;
        case "WITHDRAW":
            return state - action.payload;
        default:
            return state;
    }
};

// store
const store = (window.store = createStore(ATM));

// actions
const depositAction = (amount) => {
    return {
        type: "DEPOSIT",
        payload: amount,
    };
};

const withdrawAction = (amount) => {
    return {
        type: "WITHDRAW",
        payload: amount,
    };
};

// DOM events
const deposit = document.querySelector("#deposit");
const withdraw = document.querySelector("#withdraw");

// event listeners
deposit.addEventListener("click", () => {
    store.dispatch(depositAction(10));
});

withdraw.addEventListener("click", () => {
    store.dispatch(withdrawAction(10));
});

// subscribe
store.subscribe(() => {
    console.log("store changed");
    render();
});

const render = () => {
    const output = document.querySelector("#output");
    output.innerText = "$" + store.getState();
};

render();
