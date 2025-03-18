"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { IconButton } from "@/components/atoms/icon-button"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy el asistente virtual de ProaLAB. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])
    setInputValue("")

    // Simulate bot typing
    setIsTyping(true)
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("precio") || lowerMessage.includes("costo") || lowerMessage.includes("plan")) {
      return "Ofrecemos diferentes planes según las necesidades de tu organización. Puedes ver nuestros precios en la sección de Planes o contactar a ventas para un presupuesto personalizado."
    } else if (lowerMessage.includes("demo") || lowerMessage.includes("prueba")) {
      return "¡Claro! Puedes solicitar una demostración gratuita haciendo clic en 'Solicitar demo' en nuestra página principal. Un especialista te contactará para agendar una sesión personalizada."
    } else if (lowerMessage.includes("contacto") || lowerMessage.includes("hablar")) {
      return "Puedes contactarnos a través del formulario en nuestra página web, por correo a info@proalab.com o llamando al +56 2 2123 4567. Estaremos encantados de atenderte."
    } else if (lowerMessage.includes("funciona") || lowerMessage.includes("cómo")) {
      return "ProaLAB utiliza inteligencia artificial, procesamiento de lenguaje natural y métodos econométricos para analizar datos educativos y laborales, generando proyecciones y recomendaciones personalizadas. ¿Te gustaría conocer más sobre alguna funcionalidad específica?"
    } else {
      return "Gracias por tu mensaje. ¿Puedes proporcionar más detalles sobre tu consulta? Estoy aquí para ayudarte con información sobre nuestros productos, precios, demostraciones o cualquier otra duda que tengas sobre ProaLAB."
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <IconButton
          icon={<MessageSquare className="h-6 w-6" />}
          aria-label="Abrir chat"
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-[#EE3831] text-white hover:bg-[#E50695]"
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 z-50 w-80 md:w-96"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="shadow-xl border-2 border-[#EE3831]">
              <CardHeader className="bg-[#EE3831] text-white py-3 px-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Asistente ProaLAB
                </CardTitle>
                <IconButton
                  icon={<X className="h-5 w-5" />}
                  aria-label="Cerrar chat"
                  onClick={toggleChat}
                  variant="ghost"
                  className="text-white hover:bg-[#d32f29] h-8 w-8 p-0"
                />
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-[#EE3831] text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                          <span className="text-xs opacity-70">{message.sender === "bot" ? "Asistente" : "Tú"}</span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="h-4 w-4" />
                          <span className="text-xs opacity-70">Asistente</span>
                        </div>
                        <div className="flex space-x-1">
                          <div
                            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-1 text-gray-800 dark:text-gray-200"
                  />
                  <Button type="submit" size="icon" className="bg-[#EE3831] hover:bg-[#E50695]">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

