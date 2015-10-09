<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');}
/**
 * The Twig template library for CodeIgniter
 *
 * @package     CodeIgniter
 * @author      Eder Ribeiro <eder@ederibeiro.com> @apusoft
 * @copyright   Copyright 2014, (c) Eder Ribeiro.
 * @license     ederribeiro.mit-license.org
 * @version     Version 0.0.1
 *
 */
class Twig
{
    private $CI;
    private $_twig;
    private $_template_dir;
    private $_views_dir;
    private $_cache_dir;
    private $_file_extension;

    /**
     * Constructor
     *
     */
    function __construct($debug = false)
    {
        $this->CI =& get_instance();
        $this->CI->config->load('twig');

        ini_set('include_path',
        ini_get('include_path') . PATH_SEPARATOR . APPPATH . 'third_party/twig/twig/lib/Twig');
        require_once (string) "Autoloader" . EXT;

        log_message('debug', "Twig Autoloader Loaded");

        Twig_Autoloader::register();

        $this->_template_dir = $this->CI->config->item('template_dir');
        $this->_views_dir = $this->CI->config->item('views_dir');
        $this->_cache_dir = $this->CI->config->item('cache_dir');
        $this->_file_extension = $this->CI->config->item('file_extension');

        $loader = new Twig_Loader_Filesystem($this->_views_dir);

        $this->_twig = new Twig_Environment($loader, array(
                'cache' => $this->_cache_dir,
                'debug' => $debug,
        ));

        foreach(get_defined_functions() as $functions) {
                foreach($functions as $function) {
                    $this->_twig->addFunction($function, new Twig_Function_Function($function));
                }
        }

        $this->add_function('base_url');
    }

    public function add_function($name)
    {
        $this->_twig->addFunction($name, new Twig_Function_Function($name));
    }

    public function render($template, $body_view = '', $data = array())
    {
        if ( !empty($body_view) )
        {
            // Check if there is informed view and arrow her way
            if ( file_exists( $this->_views_dir.'/'.$this->_template_dir.'/'.$body_view.$this->_file_extension ) )
            {
                $body_view_path = $this->_template_dir.'/'.$body_view.$this->_file_extension;
            }
            else if ( file_exists( $this->_views_dir.'/'.$body_view.$this->_file_extension ) )
            {
                $body_view_path = $body_view.$this->_file_extension;
            }
            else
            {
                show_error('Unable to load the requested file: ' . $template.'/'.$body_view.$this->_file_extension);
            }
            // Renders views in body
            $body_template = $this->_twig->loadTemplate($body_view_path);
            $body = $body_template->render($data);

            if ( empty($data) )
            {
                $data = array('body' => $body);
            }
            else if ( is_array($data) )
            {
                $data['body'] = $body;
            }
        }
        // Renders the template by setting the body rendered as a variable
        $template = $this->_twig->loadTemplate($this->_template_dir.'/'.$template.$this->_file_extension);
        return $template->render($data);
    }

    public function display($template, $body_view = '', $data = array())
    {
        if ( !empty($body_view) )
        {
            // Check if there is informed view and arrow her way
            if ( file_exists( $this->_views_dir.'/'.$this->_template_dir.'/'.$body_view.$this->_file_extension ) )
            {
                $body_view_path = $this->_template_dir.'/'.$body_view.$this->_file_extension;
            }
            else if ( file_exists( $this->_views_dir.'/'.$body_view.$this->_file_extension ) )
            {
                $body_view_path = $body_view.$this->_file_extension;
            }
            else
            {
                show_error('Unable to load the requested file: ' . $template.'/'.$body_view.$this->_file_extension);
            }

            // Renders views in body
            $body_template = $this->_twig->loadTemplate($body_view_path);
            $body = $body_template->display($data);

            if ( empty($data) )
            {
                $data = array('body' => $body);
            }
            else if ( is_array($data) )
            {
                $data['body'] = $body;
            }
        }

        // Display the template by setting the body rendered as a variable
        $template = $this->_twig->loadTemplate($this->_template_dir.'/'.$template.$this->_file_extension);
        /* elapsed_time and memory_usage */
        $data['elapsed_time'] = $this->CI->benchmark->elapsed_time('total_execution_time_start', 'total_execution_time_end');
        $memory = (!function_exists('memory_get_usage')) ? '0' : round(memory_get_usage()/1024/1024, 2) . 'MB';
        $data['memory_usage'] = $memory;
        $template->display($data);
    }
}
