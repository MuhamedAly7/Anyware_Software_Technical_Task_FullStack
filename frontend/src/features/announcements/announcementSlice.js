import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import announcementService from "./announcementService";

const initialState = {
  announcements: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add Announcement
export const addAnnouncement = createAsyncThunk(
  "announcement/add",
  async (announcementData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token;
      //   console.log(token);
      //   return;
      return await announcementService.addAnnouncement(announcementData, token);
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

// Get Announcements
export const getAnnouncements = createAsyncThunk(
  "announcement/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token;
      return await announcementService.getAnnouncements(token);
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

// Delete Announcement
export const deleteAnnouncement = createAsyncThunk(
  "announcement/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token;
      //   console.log(token);
      //   return;
      return await announcementService.deleteAnnouncement(id, token);
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

// Update Announcement
export const updateAnnouncement = createAsyncThunk(
  "announcement/update",
  async (announcementData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token;
      // console.log(token);
      // console.log(announcementData);
      // return;

      const updatedData = {
        id: announcementData.id,
        topic: announcementData.updatedTopic,
        description: announcementData.updatedDescription,
      };
      return await announcementService.updateAnnouncement(updatedData, token);
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

export const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAnnouncement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnnouncement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.announcements.push(action.payload);
      })
      .addCase(addAnnouncement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAnnouncements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnnouncements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.announcements = action.payload;
      })
      .addCase(getAnnouncements.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAnnouncement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.announcements = state.announcements.filter(
          (ann) => ann._id !== action.payload.id
        );
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAnnouncement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.announcements = state.announcements.map((announcement) =>
          announcement._id === action.payload._id
            ? action.payload
            : announcement
        );
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = announcementSlice.actions;
export default announcementSlice.reducer;
