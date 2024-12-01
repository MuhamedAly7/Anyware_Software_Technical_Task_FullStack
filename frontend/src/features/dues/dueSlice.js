import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dueService from "./dueService";

const initialState = {
  dues: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add Due
export const addDue = createAsyncThunk("due/add", async (dueData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.data.token;
    // console.log(token);
    // return;
    return await dueService.addDue(dueData, token);
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message &&
        error.responce.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDues = createAsyncThunk("due/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.data.token;
    // console.log(token);
    // return;
    return await dueService.getDues(token);
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message &&
        error.responce.msg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Due
export const deleteDue = createAsyncThunk(
  "due/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token;
      // console.log(token);
      // return;
      return await dueService.deleteDue(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.responce.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Due
export const updateDue = createAsyncThunk(
  "due/update",
  async (dueData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token;
      // console.log(token);
      // return;
      // console.log(dueData);
      // return;

      const updatedData = {
        id: dueData.id,
        dueType: dueData.UpdatedDueType,
        dueTopic: dueData.UpdatedDueTopic,
        dueTitle: dueData.UpdatedDueTitle,
        dueDate: dueData.UpdatedDueDate,
        dueCourse: dueData.UpdatedDueCourse,
      };


      return await dueService.updateDue(updatedData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.responce.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dueSlice = createSlice({
  name: "due",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dues.push(action.payload);
      })
      .addCase(addDue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dues = action.payload;
      })
      .addCase(getDues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dues = state.dues.filter((due) => due._id !== action.payload.id);
      })
      .addCase(deleteDue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dues = state.dues.map((due) =>
          due._id === action.payload._id ? action.payload : due
        );
      })
      .addCase(updateDue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dueSlice.actions;
export default dueSlice.reducer;
