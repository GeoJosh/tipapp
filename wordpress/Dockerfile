FROM wordpress:5.4

RUN mkdir -p /tmp/tipapp
RUN chown -R www-data:www-data /tmp/tipapp

COPY --chown=www-data:www-data ./plugin/* /tmp/tipapp/


COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin//docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]