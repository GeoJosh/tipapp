FROM python:3.7-slim 

# Execute elevated commands
USER root
RUN useradd -ms /bin/bash tipappuser

# Install required Python packages
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

# Create application home
RUN mkdir -p /opt/service/app && chown -R tipappuser:tipappuser /opt/service

# Install supervisor requirements
RUN mkdir -p /opt/supervisor && chown -R tipappuser:tipappuser /opt/supervisor
COPY --chown=tipappuser:tipappuser files/opt/supervisor/supervisord.conf /opt/supervisor/supervisord.conf

# Copy application source files
COPY --chown=tipappuser:tipappuser __init__.py start.sh /opt/service/
COPY --chown=tipappuser:tipappuser app /opt/service/app/
RUN  chmod +x /opt/service/start.sh && sed -i -e 's/\r$//' /opt/service/start.sh

# Thunk down to non-privileged user for execution
USER tipappuser
WORKDIR /opt/service

CMD [ "./start.sh" ]

