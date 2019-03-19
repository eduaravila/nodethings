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

const todo_reducer = (state = [], action) => {
  switch (action.type) {
    case "AGREGAR_TODO":
      return [
        ...state,
        {
          id: action.id,
          nombre: action.nombre,
          activo: false
        }
      ];
    case "ELIMINAR_TODO":
      return [
        ...state.slice(0, action.id),
        ...state.slice(action.id + 1)
      ];
    default:
      return state;
  }
};
export { incremento_reducer, todo_reducer };
