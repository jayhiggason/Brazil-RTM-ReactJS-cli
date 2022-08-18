import { AuthenticationContext } from "react-adal";
import config from "./config.json"
const { clientId, tenantID, redirectUrl, logoutUrl, objectID } = config;

const adalConfig = {
    tenant: tenantID,
    clientId: clientId,
    redirectUri: redirectUrl,
    endpoints: {
        api: objectID,
    },
    postLogoutRedirectUri: logoutUrl,
    cacheLocation: "sessionStorage",
};

export const authContext = new AuthenticationContext(adalConfig);

export const getToken = () => authContext.getCachedToken(adalConfig.clientId);

// export const getToken = () => "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayIsImtpZCI6IjVPZjlQNUY5Z0NDd0NtRjJCT0hIeEREUS1EayJ9.eyJhdWQiOiIwZWVkMmNkNC1iZmEyLTRhZTItOTIzZi01NzU4MTExMWZhMWIiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8yZmMxM2UzNC1mMDNmLTQ5OGItOTgyYS03Y2I0NDZlMjViYzYvIiwiaWF0IjoxNjA4MjE0NzM0LCJuYmYiOjE2MDgyMTQ3MzQsImV4cCI6MTYwODIxODYzNCwiYWlvIjoiRTJKZ1lHaCtlUGN0YjZ0eHNIVjdPSC82d1U5OURSWFBkLzB0WldYb0QyVGZLSEpIb2c4QSIsImFtciI6WyJwd2QiXSwiZmFtaWx5X25hbWUiOiJTIiwiZ2l2ZW5fbmFtZSI6IkNoZXRoYW4iLCJpcGFkZHIiOiIxNTcuNDUuMTYwLjg4IiwibmFtZSI6IlMsIENoZXRoYW4gKENvbnRyYWN0b3IpIiwibm9uY2UiOiJkNzEwZjA4OC01NGI1LTRhMmEtOWQyOS1kOTM4ZTA1MmVjM2IiLCJvaWQiOiIzMzYxMzc5YS05MDlhLTQ4OTktYTE2Ni05NDA4ZjI0YTg3MDkiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzU1NTI4NTMxOC0zNTk4MTIxMjIwLTkyNzU3NDI5OS0xMzg2MDk4IiwicmgiOiIwLkFBQUFORDdCTHpfd2kwbVlLbnkwUnVKYnh0UXM3UTZpdi1KS2tqOVhXQkVSLWhzT0FJUS4iLCJzdWIiOiJXdzVXWWw1aGIzNGRyVGdkVVlOTmlkZXpJalE3RE9HM1FvRU5QNENjWk5rIiwidGlkIjoiMmZjMTNlMzQtZjAzZi00OThiLTk4MmEtN2NiNDQ2ZTI1YmM2IiwidW5pcXVlX25hbWUiOiJjaGV0aGFuLnMxQGVmZmVtLmNvbSIsInVwbiI6ImNoZXRoYW4uczFAZWZmZW0uY29tIiwidXRpIjoidmY2UWlUdXlta2lfd2dBeDl6Y25BQSIsInZlciI6IjEuMCIsInZlcmlmaWVkX3ByaW1hcnlfZW1haWwiOlsiY2hldGhhbi5zMUBlZmZlbS5jb20iXX0.Q-RMPjnNj7NLvpf-RZtQTJ63WysWIBHT17oe5827qGWzkMCUlmRrsmvMxuwWFgBlDqGC1biRuaWejIcVxq2QZu86ByKTB0PM4RAOc6uUgX_O6ixNMSAaeBCroxoY_wTonWj4ya1c9avByH980GkK2WilbXZ69c2RTv96rnejtXZklRp1M0sh8AXrSh4QwHT8onKwGxVZbyPq4UuBkS8_boeX3bgy1nyW-ipjI7dZQbwuVAiWX19VCa7xTK3KHHpDWQIwBFjTRrBUFNnVHBH06yDwj-24gggrL9PYmoUfSxr09zI3y4SfhZL-SCRVaacZFP9EwLVRFqsKXiguT85TIA";

