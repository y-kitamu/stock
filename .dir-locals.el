;;; Directory Local Variables
;;; For more information see (info "(emacs) Directory Variables")

((python-mode
  . (
     (lsp-docker+-server-id . pyright)
     (lsp-docker+-docker-server-id . pyr-docker)
     (lsp-docker+-server-command . "pyright-langserver --stdio")
     (lsp-docker+-server-cmd-fn . lsp-docker+-exec-in-container)
     (lsp-docker+-image-id . "docker_stock_dev")
     (lsp-docker+-container-name . "docker_stock_dev_1")
     (lsp-docker+-docker-options . "-u ${USER}")
     (lsp-docker+-path-mappings . (("${HOME}/work/" . "${HOME}/work/")))
     ))
 (c++-mode
  . (
     (lsp-docker+-server-id . ccls)
     (lsp-docker+-docker-server-id . ccls-docker)
     (lsp-docker+-server-command . "ccls")
     (lsp-docker+-image-id . "cpp_engine")
     (lsp-docker+-container-name . "cpp-lsp-docker")
     (lsp-docker+-docker-options . "-u ${USER}")
     (lsp-docker+-path-mappings . (("${HOME}/work/" . "${HOME}/work/")))
     ;; (lsp-docker+-server-cmd-fn . lsp-docker+-exec-in-container)
     )))
