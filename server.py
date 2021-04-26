import socket
import webbrowser

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM) #Создание сокета
server.bind(("192.168.1.242", 33)) #Прикрепляет сокет к Айпи+порту
#print(socket.gethostbyname_ex(socket.gethostname())) - Даёт Айпи адрес сети

server.listen() #Позволяет присоединяться к сокету, в скобки можно добавить возможное кол-во подключений (с нуля)
working = True
while working:
    user, address = server.accept()
    while True:
        data = user.recv(1024).decode("utf-8").lower() #recv получает информацию из сокета, в скобках максимальный размер
        print(data)
        if data == "youtube":
            webbrowser.open("youtube.com")
        elif data == "google":
            webbrowser.open("Google.com")