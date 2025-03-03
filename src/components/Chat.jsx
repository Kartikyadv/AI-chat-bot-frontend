import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, addMessage, sendMessage } from "../features/chatSlice";
import { Container, TextField, Button, Typography, Paper, Box, CircularProgress } from "@mui/material";

const Chatbot = () => {
    const dispatch = useDispatch();
    const { email, messages, loading } = useSelector((state) => state.chat);
    const [input, setInput] = useState("");

    const handleSendMessage = async () => {
        if (!email) {
            // User is entering email for the first time
            dispatch(setEmail(input));
            dispatch(addMessage({ sender: "user", text: input }));

            // Call the API with only email
            dispatch(sendMessage({ email: input, message: "" })); 
        } else {
            // Normal chat message
            dispatch(addMessage({ sender: "user", text: input }));
            dispatch(sendMessage({ email, message: input }));
        }
        setInput("");
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, height: "80vh", overflowY: "auto" }}>
                <Typography variant="h5" gutterBottom>Chatbot</Typography>
                <Box sx={{ mb: 2 }}>
                    {messages.map((msg, index) => (
                        <Typography
                            key={index}
                            sx={{
                                textAlign: msg.sender === "user" ? "right" : "left",
                                backgroundColor: msg.sender === "user" ? "#2196F3" : "#E0E0E0",
                                color: msg.sender === "user" ? "white" : "black",
                                padding: 1,
                                borderRadius: 2,
                                display: "inline-block",
                                marginBottom: 1,
                            }}
                        >
                            {msg.text}
                        </Typography>
                    ))}
                    {loading && <CircularProgress size={20} />}
                </Box>
                <TextField
                    fullWidth
                    label={email ? "Type your message..." : "Enter your email"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                >
                    Send
                </Button>
            </Paper>
        </Container>
    );
};

export default Chatbot;
