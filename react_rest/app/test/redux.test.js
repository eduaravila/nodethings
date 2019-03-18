import { incremento_reducer as incremento } from "../src/reducers/reducer/incremento";
import { createStore } from "redux";

const store = createStore(incremento);

test("incrementar ", () => {
  store.dispatch({ type: "INCREMENTAR" });  
  expect(store.getState()).toBe(1);
});
