import {
  incremento_reducer as incremento,
  todo_reducer as todo
} from "../src/reducers/reducer/incremento";
import { createStore } from "redux";

const store_todo = createStore(todo);

const store = createStore(incremento);
let estado_subcripcion = 0;

const subs = () => (estado_subcripcion = store.getState());

store.subscribe(subs);

describe("TODO -- REDUCER", () => {
  test("AGREGAR TODO", () => {
    let antes = [];
    let accion = { type: "AGREGAR_TODO", id: 0, nombre: "Bañar a el perro" };
    let despues = [{ id: 0, nombre: "Bañar a el perro", activo: false }];
    store_todo.dispatch(accion);
    expect(store_todo.getState()).toEqual(despues);
  });
  test("AGREGAR TODO 2 ", () => {
    let antes = [];
    let accion = { type: "AGREGAR_TODO", id: 1, nombre: "Bañar a el GATO" };
    let despues = [
      { id: 0, nombre: "Bañar a el perro", activo: false },
      { id: 1, nombre: "Bañar a el GATO", activo: false }
    ];
    store_todo.dispatch(accion);
    expect(store_todo.getState()).toEqual(despues);
  });
  test("ELIMINAR TODO", () => {
    let accion = { type: "ELIMINAR_TODO", id: 0 };
    let despues = [{ id: 1, nombre: "Bañar a el GATO", activo: false }];
    store_todo.dispatch(accion);
    expect(store_todo.getState()).toEqual(despues);
  });
});

test("incrementar ", () => {
  store.dispatch({ type: "INCREMENTAR" });
  expect(store.getState()).toBe(1);
});
test("decrementar ", () => {
  store.dispatch({ type: "DECREMENTAR" });
  expect(store.getState()).toBe(0);
});
test("Estado subscricion ", () => {
  expect(estado_subcripcion).toBe(0);
});
