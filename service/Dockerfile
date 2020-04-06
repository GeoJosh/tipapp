FROM python:3.7-slim 



# Execute elevated commands
USER root
RUN useradd -ms /bin/bash tipappuser

# Install required Python packages
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

# Create application home
RUN mkdir -p /opt/service/app && chown -R tipappuser:tipappuser /opt/service
WORKDIR /opt/service

# Copy application source files
COPY --chown=tipappuser:tipappuser __init__.py start.sh /opt/service/
RUN  chmod +x start.sh && sed -i -e 's/\r$//' start.sh
COPY --chown=tipappuser:tipappuser app /opt/service/app/

USER tipappuser

CMD [ "./start.sh" ]
