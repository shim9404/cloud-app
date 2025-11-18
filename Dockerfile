# 1. Node.js 22버전
FROM node:22

# 2. 컨테이너 안에서 작업할 디렉토리 지정하기
WORKDIR /usr/src/app

# 3. 의존성 파일 설치를 위한 package파일 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 소스 코드 전체 복사하기
COPY . .


# 6. 서버가 사용하는 포트 오픈하기
EXPOSE 3000

# 7. 서버 실행 명령
CMD [ "npm", "start" ]
# CMD ["node", "./bin/www"] 

# 8. Docker이미지 만들기
# docker build -t web-server-image .

# 9. Docker 컨테이너 실행
# docker run -d -p 5000:5000 --name web-server web-server-image

#10. 브라우저에서 접속 확인하기
# http://xn--ip-cb5ju9v:5000