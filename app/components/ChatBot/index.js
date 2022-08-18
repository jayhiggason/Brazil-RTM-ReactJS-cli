/**
 *
 * ChatBot
 *
 */

import React, {memo} from "react";
import {ThemeProvider} from "styled-components";
import ChatBotComp from 'react-simple-chatbot';
import history from "../../utils/history";

function ChatBot() {
    const config = {
        width: "800px",
        height: "550px",
        floating: true,
    };

    const show = history.location.pathname === "/" ? false : true;

    const theme = {
        background: "#f5f8fb",
        fontFamily: "MarsCentra-Book",
        headerBgColor: "whitesmoke",
        headerFontColor: "#4c4c4c",
        headerFontSize: "16px",
        botBubbleColor: "#1940A0",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#4c4c4c",
    };
    return (

        <ThemeProvider theme={theme}>

            {
                (() => {
                    if (show) {
                        return (
                            <ChatBotComp
                                steps={[
                                    {
                                        id: '1',
                                        message: 'What are products that are at high risk?',
                                        trigger: '2',
                                    },
                                    {
                                        id: '2',
                                        user: true,
                                        trigger: '3',
                                    },
                                    {
                                        id: '3',
                                        message: 'What are products that are at Low risk?',
                                        end: true,
                                    },
                                ]}
                                {...config}
                            />
                        );
                    } else {
                        return (
                            < div/>
                        )
                    }
                })()
            }

        </ThemeProvider>
    );
}

ChatBot.propTypes = {};

export default memo(ChatBot);
