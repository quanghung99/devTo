import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { commentModel } from 'models';

interface commentState {
	isLoading?: boolean;
	commentList: commentModel[];
}

const initialState: commentState = {
	isLoading: false,
	commentList: [],
};

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		getListComment(state, PayloadAction) {
			state.isLoading = true;
		},
		setListComment(state, action: PayloadAction<commentModel[]>) {
			state.isLoading = false;
			state.commentList = action.payload;
		},
		addComment(state, action: PayloadAction<commentModel>) {},
		removeComment(state) {},
	},
});
const commentReducer = commentSlice.reducer;

export const commentActions = commentSlice.actions;
export const selectCommentLoading = (state: RootState) =>
	state.comment.isLoading;
export const selectCommentList = (state: RootState) =>
	state.comment.commentList;
// export const selectCommentListByUser = createSelector(
// 	selectCommentList,
// 	(commentList) =>
// 		commentList.reduce((map: { [key: string]: commentModel }, comment) => {
// 			map[comment.comment.author?.profile.username] = comment;
// 			return map;
// 		})
// );

export default commentReducer;
