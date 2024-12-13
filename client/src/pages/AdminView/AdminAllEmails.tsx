import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Colors from "../../colors";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import axios from "axios";
import { Avatar, Card, CardActionArea, CardContent, CircularProgress, IconButton, Pagination } from "@mui/material";
import imgEmptyMail from "../../assets/emptymail.png";
import Delete from "@mui/icons-material/DeleteOutlineOutlined";

type EmailInfo = {
    name: string;
    email: string;
};

type Mail = {
    id: string;
    sender: EmailInfo;
    receiver: EmailInfo;
    sentTime: string;
    subject: string;
    cc?: string[];
    body: string;
};

export default function AdminAllEmail() {
    const { student_email } = useParams();
    const [mailIndex, setMailIndex] = useState<string | null>(null);
    const [emails, setEmails] = useState<Mail[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const fetchAccessToken = async (): Promise<string> => {
        if (accessToken) return accessToken;

        if (!isAuthenticated) {
            throw new Error("User is not authenticated");
        }

        try {
            let activeAccount = instance.getActiveAccount();
            if (!activeAccount) {
                const accounts = instance.getAllAccounts();
                if (accounts.length === 0) {
                    throw new Error("No accounts found. Please log in again.");
                }
                activeAccount = accounts[0];
                instance.setActiveAccount(activeAccount);
            }

            const tokenResponse = await instance.acquireTokenSilent({
                scopes: ["Mail.Read"],
                account: activeAccount,
            });

            const newAccessToken = tokenResponse.accessToken;
            setAccessToken(newAccessToken);
            return newAccessToken;
        } catch (err: any) {
            console.error("Error acquiring access token:", err);
            throw new Error("Error acquiring access token: " + (err.message || "Unknown error"));
        }
    };

    const fetchEmails = async (page: number = 1): Promise<void> => {
        try {
            console.log("Fetching emails...");
            setLoading(true);
    
            const token = await fetchAccessToken();
            const pageSize = 10; // Number of emails to fetch per request
            let nextLink = `https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages?$top=${pageSize}&$skip=${(page - 1) * pageSize}`; // Start with the initial link
            const allEmails: Mail[] = [];
            const maxCalls = 5; // Limit API calls to prevent infinite loops
            let currentCall = 0;
    
            while (currentCall < maxCalls) {
                currentCall++;
    
                const emailResponse = await axios.get(nextLink, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const emails = emailResponse.data.value.map((email: any) => ({
                    id: email.id,
                    sender: {
                        name: email.from?.emailAddress?.name || "Unknown Sender",
                        email: email.from?.emailAddress?.address || "Unknown Email",
                    },
                    receiver: {
                        name: email.toRecipients[0]?.emailAddress?.name || "Unknown Recipient",
                        email: email.toRecipients[0]?.emailAddress?.address || "Unknown Email",
                    },
                    sentTime: email.receivedDateTime,
                    subject: email.subject,
                    body: email.bodyPreview,
                }));
    
                allEmails.push(...emails); // Accumulate the results
    
                nextLink = emailResponse.data["@odata.nextLink"] || null; // Get next page link if available
    
                // Update totalPages from @odata.count
                if (emailResponse.data["@odata.count"]) {
                    setTotalPages(Math.ceil(emailResponse.data["@odata.count"] / pageSize));
                }
            }
    
            setEmails(allEmails); // Set the fetched emails to the state
        } catch (err: any) {
            console.error("Error fetching emails:", err);
            setEmails([]); // Set emails to empty in case of error
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    
    
    

    useEffect(() => {
        if (instance && isAuthenticated) {
            fetchEmails(page);
        }
    }, [instance, isAuthenticated, page]);

    const handlePageChange = (_event: any, value: number) => {
        setPage(value);
    };

    const navigate = useNavigate();

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <Toolbar />
                
                {loading ? (
                    <CircularProgress />
                ) : emails.length === 0 ? (
                    <EmptyMail />
                ) : (
                    <HasMail
                        id={mailIndex}
                        setMailIndex={setMailIndex}
                        emails={emails}
                        accessToken={accessToken}
                    />
                )}
                {/* <Box mt={3} display="flex" justifyContent="center">
                    <Pagination
                        
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box> */}
            </Box>
            <Outlet />
        </>
    );
}

function EmptyMail() {
    return (
        <Paper>
            <img src={imgEmptyMail} alt="empty mail" />
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                You haven't sent any messages to the Resource Generation Office (RGO) yet.
            </Typography>
            <Typography variant="h5" mt={4}>
                Feel free to reach out if you have any questions or need assistance.
            </Typography>
        </Paper>
    );
}

type HasMailProp = {
    id: string | null;
    setMailIndex: (id: string | null) => void;
    emails: Mail[];
    accessToken: string | null;
};

function HasMail({ id, setMailIndex, emails, accessToken }: HasMailProp) {
    return (
        <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
            <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="h6" sx={{ fontWeight: "bold", padding: 2, borderBottom: "1px solid black" }}>
                    Inbox ({emails.length})
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        maxWidth: "300px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        maxHeight: "75vh",
                        overflowY: "auto",
                    }}
                >
                    <Box>
                        {emails.map((email) => (
                            <MailListItem
                                key={email.id}
                                receiver={email.receiver}
                                body={email.body}
                                id={email.id}
                                sender={email.sender}
                                subject={email.subject}
                                sentTime={email.sentTime}
                                onClick={() => setMailIndex(email.id)}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    marginLeft: 2,
                    overflowY: "auto",
                    padding: 2,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                {id !== null && accessToken ? (
                    <SpecificMail id={id} accessToken={accessToken} />
                ) : (
                    <Typography>No email selected</Typography>
                )}
            </Box>
        </Box>
    );
}

function MailListItem({ sender, subject, sentTime, onClick }: Mail & { onClick: () => void }) {
    return (
        <Card sx={{ marginBottom: 1 }}>
            <CardActionArea onClick={onClick}>
                <CardContent sx={{ padding: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold", alignSelf: "start" }}>
                        {sender.name}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            variant="body2"
                            textAlign={"left"}
                            style={{
                                maxHeight: "2em",
                                whiteSpace: "nowrap",
                                overflowX: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {subject}
                        </Typography>
                        <Typography variant="body2" textAlign={"left"}>
                            {sentTime
                                ? new Date(sentTime).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                  })
                                : ""}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

type SpecificMailProp = {
    id: string;
    accessToken: string;
};

function SpecificMail({ id, accessToken }: SpecificMailProp) {
    const [emailContent, setEmailContent] = useState<Mail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmailContent = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`https://graph.microsoft.com/v1.0/me/messages/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const emailData = response.data;

            const email: Mail = {
                id: emailData.id,
                sender: {
                    name: emailData.from?.emailAddress?.name || "Unknown Sender",
                    email: emailData.from?.emailAddress?.address || "Unknown Email",
                },
                receiver: {
                    name: emailData.toRecipients[0]?.emailAddress?.name || "Unknown Recipient",
                    email: emailData.toRecipients[0]?.emailAddress?.address || "Unknown Email",
                },
                sentTime: emailData.receivedDateTime,
                subject: emailData.subject,
                body: emailData.body?.content || "No content available",
                cc: emailData.ccRecipients?.map((cc: any) => cc.emailAddress?.address) || [],
            };

            setEmailContent(email);
        } catch (err) {
            console.error("Error fetching email content:", err);
            setError("Failed to load email content.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmailContent();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Paper
            sx={{
                minHeight: "75vh",
                maxHeight: "75vh",
                marginLeft: 3,
                textAlign: "left",
                overflowY: "auto",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    backgroundColor: Colors.blue,
                    textAlign: "left",
                    height: 50,
                    color: "white",
                    fontSize: 30,
                    paddingLeft: 5,
                }}
            >
                {emailContent?.subject}
            </Typography>
            <Box display={"flex"} sx={{ padding: 4, justifyContent: "space-between" }}>
                <Box display={"flex"}>
                    <Avatar>{emailContent?.sender.name[0]}</Avatar>
                    <Box sx={{ textAlign: "left", marginLeft: 1 }}>
                        <Typography variant="body1">{emailContent?.sender.name}</Typography>
                        <Typography variant="body2">to: {emailContent?.receiver.email}</Typography>
                        {emailContent?.cc && (
                            <Typography variant="body2">cc: {emailContent?.cc.join(", ")}</Typography>
                        )}
                    </Box>
                </Box>
                <IconButton>
                    <Delete />
                </IconButton>
            </Box>
            <Typography
                variant="body1"
                sx={{ paddingLeft: 5, paddingRight: 5 }}
                dangerouslySetInnerHTML={{ __html: emailContent?.body || "" }}
            />
        </Paper>
    );
}
