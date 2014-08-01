<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * The Config for Twig template library for CodeIgniter
 *
 * @package     CodeIgniter
 * @author      Eder Ribeiro <eder@ederibeiro.com> @apusoft
 * @copyright   Copyright 2014, (c) Eder Ribeiro.
 * @license     ederribeiro.mit-license.org
 * @version     Version 0.0.1
 *
 */

// Sets the name of template_dir that will be used with standard views_dir
$config['template_dir'] = 'templates';
// The standard views directory
$config['views_dir'] = APPPATH.'views';
// Sets the cache directory
$config['cache_dir'] = APPPATH.'cache/twig';
// Sets the file extensions that will be rendered
$config['file_extension'] = '.html';
