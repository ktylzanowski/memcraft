from rest_framework.pagination import PageNumberPagination

class CommentPagination(PageNumberPagination):
    page_size = 2 
    page_size_query_param = 'page_size'
    max_page_size = 50


class BoradPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'