import { useState, useEffect, useCallback } from 'react';

import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetContacts, useGetConversation, useGetConversations } from 'src/actions/chat';

import { EmptyContent } from 'src/components/empty-content';
import Grid from '@mui/material/Unstable_Grid2';

import { useMockedUser } from 'src/auth/hooks';

import { Layout } from '../layout';
import { ChatNav } from '../chat-nav';
import { ChatRoom } from '../chat-room';
import { ChatMessageList } from '../chat-message-list';
import { ChatMessageInput } from '../chat-message-input';
import { ChatHeaderDetail } from '../chat-header-detail';
import { ChatHeaderCompose } from '../chat-header-compose';
import { useCollapseNav } from '../hooks/use-collapse-nav';


import { AppWidgetSummary } from './app-widget-summary';

// ----------------------------------------------------------------------

export function ChatView() {
  const router = useRouter();

  const { user } = useMockedUser();

  const { contacts } = useGetContacts();

  const searchParams = useSearchParams();

  const selectedConversationId = searchParams.get('id') || '';

  const [recipients, setRecipients] = useState([]);

  const { conversations, conversationsLoading } = useGetConversations();

  const { conversation, conversationError, conversationLoading } = useGetConversation(
    `${selectedConversationId}`
  );

  const roomNav = useCollapseNav();

  const conversationsNav = useCollapseNav();

  const participants = conversation
    ? conversation.participants.filter((participant) => participant.id !== `${user?.id}`)
    : [];

  useEffect(() => {
    if (conversationError || !selectedConversationId) {
      router.push(paths.dashboard.chat);
    }
  }, [conversationError, router, selectedConversationId]);

  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected);
  }, []);

  return (
    <DashboardContent
      maxWidth={false}
      sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}
    >
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Chat
      </Typography>


      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="User ID:"
            codeicon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <g fill="none" stroke="#5ee943" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="#5ee943">
                  <path d="M8.5 18c1.813-1.954 5.167-2.046 7 0m-1.56-6c0 1.105-.871 2-1.947 2c-1.075 0-1.947-.895-1.947-2s.872-2 1.947-2s1.948.895 1.948 2" />
                  <path d="M9.5 4.002c-2.644.01-4.059.102-4.975.97C3.5 5.943 3.5 7.506 3.5 10.632v4.737c0 3.126 0 4.69 1.025 5.66c1.025.972 2.675.972 5.975.972h3c3.3 0 4.95 0 5.975-.971c1.025-.972 1.025-2.535 1.025-5.66v-4.738c0-3.126 0-4.689-1.025-5.66c-.916-.868-2.33-.96-4.975-.97" />
                  <path d="M9.772 3.632c.096-.415.144-.623.236-.792a1.64 1.64 0 0 1 1.083-.793C11.294 2 11.53 2 12 2s.706 0 .909.047a1.64 1.64 0 0 1 1.083.793c.092.17.14.377.236.792l.083.36c.17.735.255 1.103.127 1.386a1.03 1.03 0 0 1-.407.451C13.75 6 13.332 6 12.498 6h-.996c-.834 0-1.252 0-1.533-.17a1.03 1.03 0 0 1-.407-.452c-.128-.283-.043-.65.127-1.386z" />
                </g>
              </svg>
            }
            total={357}
            extratext="Unique Identifier"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [15, 18, 12, 51, 68, 11, 39, 37],
            }}
          />
        </Grid>



        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="User Type"
            extratext="Basic User."
            total="Bronze"


            codeicon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path fill="#5ee943" d="M14.94 19.5L12 17.77L9.06 19.5l.78-3.34l-2.59-2.24l3.41-.29L12 10.5l1.34 3.13l3.41.29l-2.59 2.24M20 2H4v2l4.86 3.64a8 8 0 1 0 6.28 0L20 4m-2 11a6 6 0 1 1-7.18-5.88a5.9 5.9 0 0 1 2.36 0A6 6 0 0 1 18 15m-5.37-8h-1.26l-4-3h9.34Z" />
              </svg>
            }
            chart={{

              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Last Chat"

            codeicon={
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#5ee943" d="M14.5 16h-13C.67 16 0 15.33 0 14.5v-12C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5z" />
                <path fill="#5ee943" d="M4.5 4c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m7 0c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m4 2H.5C.22 6 0 5.78 0 5.5S.22 5 .5 5h15c.28 0 .5.22.5.5s-.22.5-.5.5" />
              </svg>
            }

            total="Pending"
            extratext="Hello i would to tell yo..."
            chart={{

              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid>
      </Grid >



      <Layout
        sx={{
          minHeight: 0,
          flex: '1 1 0',
          borderRadius: 2,
          position: 'relative',
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.card,
        }}
        slots={{
          header: selectedConversationId ? (
            <><p>We would highly recommend that you communicate to us via the Message section during your application process.</p></>
          ) : (
            <Typography
              variant="caption"
              sx={{
                mt: 3,
                mb: 3,
                mx: '',
                display: 'block',
                textAlign: 'left',
                color: 'gray',
              }}
            >
              We would highly recommend that you communicate to us via the Message section during your application process.
            </Typography>
          ),
          nav: (
            <></>
          ),
          main: (
            <>
              {selectedConversationId ? (
                <ChatMessageList
                  messages={conversation?.messages ?? []}
                  participants={participants}
                  loading={conversationLoading}
                />
              ) : (
                <EmptyContent
                  imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-chat-active.svg`}
                  title="Good morning!"
                  description="Write something awesome..."
                />
              )}

              <ChatMessageInput
                recipients={recipients}
                onAddRecipients={handleAddRecipients}
                selectedConversationId={selectedConversationId}
                disabled={!recipients.length && !selectedConversationId}
              />
            </>
          ),
          details: selectedConversationId && (
            <ChatRoom
              collapseNav={roomNav}
              participants={participants}
              loading={conversationLoading}
              messages={conversation?.messages ?? []}
            />
          ),
        }}
      />
    </DashboardContent>
  );
}
