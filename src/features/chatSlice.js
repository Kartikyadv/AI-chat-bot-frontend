import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/chat"; // Adjust as needed

// Async function to start chat or send a message
export const sendMessage = createAsyncThunk("chat/sendMessage", async ({ email, message }) => {
    const response = await axios.post(API_URL+"/message", { email, message });
    return response.data.message;
});

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        email: "",
        messages: [{ sender: "bot", text: "Welcome! Please enter your email to start chatting." }],
        loading: false,
        error: null,
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push({ sender: "bot", text: action.payload });
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setEmail, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
