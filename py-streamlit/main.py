import streamlit as st
import random
import time
from langchain_aws import BedrockLLM

def get_llm():
    
    model_kwargs = {
    }
    
    llm = BedrockLLM(
        model_id="amazon.titan-text-premier-v1:0",
        model_kwargs=model_kwargs)
    
    return llm



def get_text_response(user_input): #text-to-text client function
    llm = get_llm()
    
    return llm.invoke(user_input) #return a response to the prompt


def load_view():
    st.title("Bedrock Demo")
    
    access_key_id = st.secrets["awsbedrock"]["access_key_id"]
    secret_access_key = st.secrets["awsbedrock"]["secret_access_key"]
    secret_access_key = st.secrets["awsbedrock"]["secret_access_key"]

    if "messages" not in st.session_state:
        st.session_state.messages = [
            {
                "role": "system",
                "name": "situation",
                "content": "Hi, John. I am your Bedrock Buddy."
            }
        ]

    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    if prompt := st.chat_input("Ask Bedrock Chatbot"):
        st.session_state.messages.append({"role": "user", "name": "John", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        with st.chat_message("assistant"):
            response = get_text_response(
                prompt
            )
            st.write(response)
            
        st.session_state.messages.append({"role": "assistant", "name": "Bedrock", "content": response})


load_view()