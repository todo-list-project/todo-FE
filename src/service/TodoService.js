import request, { FAIL, SUCCESS } from '../util/Request';

const AdminBoardService = {
    getVocBoardList: async (page) => {
        console.log('page', page);
        try {
            const response = await request.get(
                `http://localhost:5000/todos?_start=${page}&_limit=10`
            );

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

export default AdminBoardService;
