import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  Send,
  MessageCircle,
  User,
  Clock,
  Paperclip,
  Phone,
  Video,
  AlertTriangle,
  CheckCircle,
  Info,
  Star,
  Archive,
  Trash2,
  Download,
  Printer,
  Eye,
  Reply,
  Forward
} from "lucide-react";
import { useHealthcare } from "@/hooks/use-healthcare";
import { getRelativeTime, getPriorityColor } from "@/lib/utils";
import { useState, useMemo } from "react";

const Messages = () => {
  const userRole: 'doctor' = 'doctor';
  const {
    filteredMessages: messages,
    searchTerm,
    setSearchTerm,
    selectedFilters,
    setFilter,
    clearFilters,
    stats,
    getPatientById,
    getDoctorById
  } = useHealthcare();

  const [selectedThread, setSelectedThread] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  // Group messages by thread
  const messageThreads = useMemo(() => {
    const threads = messages.reduce((acc, message) => {
      if (!acc[message.threadId]) {
        acc[message.threadId] = {
          id: message.threadId,
          participants: [message.sender],
          lastMessage: message.content,
          lastMessageTime: message.timestamp,
          unreadCount: messages.filter(m => m.threadId === message.threadId && !m.read).length,
          isUrgent: messages.some(m => m.threadId === message.threadId && m.priority === 'urgent'),
          priority: message.priority,
          avatar: message.sender.split(' ').map(n => n[0]).join('').slice(0, 2)
        };
      } else {
        if (!acc[message.threadId].participants.includes(message.sender)) {
          acc[message.threadId].participants.push(message.sender);
        }
        if (new Date(message.timestamp) > new Date(acc[message.threadId].lastMessageTime)) {
          acc[message.threadId].lastMessage = message.content;
          acc[message.threadId].lastMessageTime = message.timestamp;
          acc[message.threadId].priority = message.priority;
        }
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.values(threads).sort((a, b) => 
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
  }, [messages]);

  const currentThreadMessages = messages.filter(m => m.threadId === selectedThread);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'normal': return <Info className="h-4 w-4 text-blue-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const MessageDetailDialog = ({ message }: { message: any }) => {
    const sender = message.sender.includes('Dr.') ? 
      getDoctorById(message.sender) : 
      getPatientById(message.sender);
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Message Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Message Header */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{message.sender.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                </div>
                <div>
                  <p className="font-medium">{message.sender}</p>
                  <p className="text-sm text-muted-foreground">{getRelativeTime(message.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getPriorityIcon(message.priority)}
                <Badge variant="outline" className={getPriorityColor(message.priority)}>
                  {message.priority}
                </Badge>
              </div>
            </div>

            {/* Message Content */}
            <div className="p-4 border rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div>
                <p className="font-medium mb-2">Attachments:</p>
                <div className="space-y-2">
                  {message.attachments.map((attachment: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <Paperclip className="h-4 w-4" />
                      <span className="text-sm">{attachment}</span>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sender Information */}
            {sender && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium mb-2">Sender Information:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span>{sender.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span>{sender.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span>{sender.email}</span>
                  </div>
                  {'specialty' in sender && sender.specialty && (
                    <div className="flex justify-between">
                      <span>Specialty:</span>
                      <span>{sender.specialty}</span>
                    </div>
                  )}
                  {'condition' in sender && sender.condition && (
                    <div className="flex justify-between">
                      <span>Condition:</span>
                      <span>{sender.condition}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
              <Button variant="outline">
                <Forward className="h-4 w-4 mr-2" />
                Forward
              </Button>
              <Button variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Layout userRole={userRole}>
      <div className="container max-w-7xl mx-auto p-6 h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Message Threads List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Messages ({stats.unreadMessages} unread)
                </CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedFilters.priority || ''} onValueChange={(value) => setFilter('priority', value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {messageThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className={`p-4 hover:bg-muted/50 cursor-pointer border-b transition-colors ${
                      thread.id === selectedThread ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedThread(thread.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{thread.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium truncate">
                            {thread.participants.join(', ')}
                          </p>
                          <div className="flex items-center gap-2">
                            {thread.isUrgent && (
                              <div className="h-2 w-2 rounded-full bg-red-500" />
                            )}
                            {thread.unreadCount > 0 && (
                              <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                {thread.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mb-1">
                          {thread.lastMessage}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{getRelativeTime(thread.lastMessageTime)}</span>
                          {getPriorityIcon(thread.priority)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Thread View */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {messageThreads.find(t => t.id === selectedThread)?.avatar || 'NA'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {messageThreads.find(t => t.id === selectedThread)?.participants.join(', ') || 'Select a thread'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentThreadMessages.length} messages
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {currentThreadMessages.length > 0 ? (
                  currentThreadMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${
                      message.isFromUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    } rounded-lg p-3`}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">{message.sender}</p>
                          <div className="flex items-center gap-1">
                            {getPriorityIcon(message.priority)}
                            <MessageDetailDialog message={message} />
                          </div>
                        </div>
                      <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                        message.isFromUser 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                          {getRelativeTime(message.timestamp)}
                      </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a conversation to view messages</p>
                  </div>
                )}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-end gap-3">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="min-h-[80px] resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </div>
                <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;