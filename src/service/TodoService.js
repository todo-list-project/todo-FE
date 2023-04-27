import request, { FAIL, SUCCESS } from '../util/Request';

const TodoService = {
  getWriteTodo: async () => {
    try {
      const response = await request.get(`/vocAdmin`);

      if (request.isSuccess(response)) {
        return {
          ...response,
          status: SUCCESS,
        };
      }
      return { status: FAIL };
    } catch (error) {
      return {
        status: FAIL,
      };
    }
  },
};
