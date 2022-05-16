FROM public.ecr.aws/lambda/nodejs:12

# Copy function code
COPY /dist/app.js ${LAMBDA_TASK_ROOT}/app.js
COPY /dist/app.js.map ${LAMBDA_TASK_ROOT}/app.js.map

# Install NPM dependencies for function
RUN npm install

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app.handler" ]
