const incremento_reducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENTAR":
      return state + 1;

    case "DECREMENTAR":
      return state - 1;

    default:
      return state;
  }
};
export { incremento_reducer };
